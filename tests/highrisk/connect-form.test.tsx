/**
 * 고위험 경로 — 개인정보 축: 연결 폼의 **민감정보 분리 동의 + 데이터 최소화**(PIPA §23).
 *
 * 왜 이 파일인가: ConnectForm 은 이름·이메일에 더해 **국적·비자**(민감정보)를 입력받는다.
 * 규칙은 "별도 선택 동의가 없으면 국적·비자를 아예 전송하지 않는다"이고, 그 규칙을
 * 지키는 장치는 `handleSubmit` 안의 삼항식 두 줄뿐이다. 조용히 뒤집히면 동의 없는
 * 민감정보 수집이 되는데 지금까지 이를 잡는 테스트가 0개였다.
 *
 * 범위: G2 `eval/highrisk_paths.json` 에 동결된 `src/app/[locale]/connect/ConnectForm.tsx`.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";

// next-intl: 키를 그대로 돌려준다(문구가 아니라 동작을 검증한다).
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// i18n 라우팅 Link → 평범한 앵커.
vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const submitForm = vi.hoisted(() => vi.fn());
vi.mock("@/lib/submit", () => ({ submitForm }));

import ConnectForm from "@/app/[locale]/connect/ConnectForm";

/** 필수 필드를 채우고 필수 동의를 켠다. 민감정보 동의는 호출자가 결정. */
function fillRequired(container: HTMLElement) {
  fireEvent.change(container.querySelector("#name")!, { target: { value: "Alex" } });
  fireEvent.change(container.querySelector("#email")!, {
    target: { value: "alex@example.test" },
  });
  fireEvent.change(container.querySelector("#nationality")!, {
    target: { value: "Vietnam" },
  });
  // 체크박스 순서 = [필수 동의, 민감정보 선택 동의] (컴포넌트 구조와 함께 고정)
  const boxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
  expect(boxes.length, "동의 체크박스가 2개(필수+선택)여야 한다").toBe(2);
  return boxes;
}

function payloadOf() {
  expect(submitForm).toHaveBeenCalledTimes(1);
  const [kind, payload] = submitForm.mock.calls[0];
  expect(kind).toBe("lead");
  return payload as Record<string, unknown>;
}

describe("ConnectForm — 민감정보 분리 동의 (PIPA §23)", () => {
  beforeEach(() => {
    submitForm.mockReset();
    submitForm.mockResolvedValue({ ok: true });
  });

  it("선택 동의가 꺼져 있으면 국적·비자를 전송하지 않는다", async () => {
    const { container } = render(<ConnectForm locale="en" initialTopic="housing" />);
    const boxes = fillRequired(container);
    fireEvent.click(boxes[0]); // 필수 동의만
    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => expect(submitForm).toHaveBeenCalled());
    const p = payloadOf();
    expect(p.nationality, "동의 없이 국적이 전송됐다").toBeNull();
    expect(p.visa_type, "동의 없이 비자가 전송됐다").toBeNull();
    expect(p.sensitive_consent).toBe(false);
    // 필수 항목은 정상 전송되어야 한다(과잉 차단도 회귀다).
    expect(p.name).toBe("Alex");
    expect(p.email).toBe("alex@example.test");
  });

  it("선택 동의가 켜지면 국적이 전송된다", async () => {
    const { container } = render(<ConnectForm locale="en" initialTopic="tax" />);
    const boxes = fillRequired(container);
    fireEvent.click(boxes[0]);
    fireEvent.click(boxes[1]);
    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => expect(submitForm).toHaveBeenCalled());
    const p = payloadOf();
    expect(p.nationality).toBe("Vietnam");
    expect(p.sensitive_consent).toBe(true);
  });

  it("필수 동의가 없으면 아무것도 전송되지 않는다", async () => {
    const { container } = render(<ConnectForm locale="en" initialTopic="general" />);
    fillRequired(container);
    fireEvent.submit(container.querySelector("form")!);
    await new Promise((r) => setTimeout(r, 0));
    expect(submitForm).not.toHaveBeenCalled();
  });
});

describe("ConnectForm — 허니팟(봇 차단)", () => {
  beforeEach(() => {
    submitForm.mockReset();
    submitForm.mockResolvedValue({ ok: true });
  });

  it("숨은 필드가 채워지면 저장하지 않고 성공한 척한다", async () => {
    const { container } = render(<ConnectForm locale="en" initialTopic="housing" />);
    const boxes = fillRequired(container);
    fireEvent.click(boxes[0]);
    fireEvent.change(container.querySelector("#company")!, {
      target: { value: "bot-corp" },
    });
    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => expect(screen.getByText("successTitle")).toBeInTheDocument());
    expect(submitForm, "허니팟에 걸린 제출이 DB로 갔다").not.toHaveBeenCalled();
  });
});
