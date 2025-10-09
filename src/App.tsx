import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import image1 from "./assets/image1.png";
import image7 from "./assets/image7.png";
import image8 from "./assets/image8.png";
import image9 from "./assets/image9.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { Gap } from "@alfalab/core-components/gap";
import { FormEvent, useState } from "react";
import { Textarea } from "@alfalab/core-components/textarea";
import { sendDataToGA } from "./utils/events.ts";

const longRead = "alfabank://longread?endpoint=v1/adviser/longreads/77415";

const Redirect = () => {
  window.location.href = longRead;

  return null;
};

export const App = () => {
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [value, setValue] = useState("");
  const [label, setLabel] = useState(
    "Напишите цель. Например, Саше на новый велосипед",
  );
  const [loading, setLoading] = useState(false);

  const submit = () => {
    window.gtag("event", "6076_get_sub", {
      variant_name: "6076_3",
    });

    setLoading(true);

    sendDataToGA({ main_aim: value }).then(() => {
      setLoading(false);
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
    });
  };

  if (thxShow) {
    return <Redirect />;
  }

  return (
    <>
      <div className={appSt.container}>
        <img
          src={image1}
          alt="Картинка Альфа-Смарт"
          style={{ borderRadius: "16px" }}
        />

        <Gap size={16} />

        <Typography.Title tag="h1" view="small" weight="bold">
          Помогите ребёнку накопить на мечту
        </Typography.Title>

        <Gap size={16} />

        <Typography.Text>
          Поставьте цель для ребёнка и откройте копилку в детском приложении —
          сделаем выше %
        </Typography.Text>

        <Gap size={32} />

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <img src={image7} alt="" width={48} height={48} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text view="primary-small">12% годовых</Typography.Text>
            <Gap size={4} />
            <Typography.Text color="secondary" view="primary-small">
              Больше прибыли по счёту
            </Typography.Text>
          </div>
        </div>

        <Gap size={16} />

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <img
            src={image8}
            alt=""
            width={48}
            height={48}
            style={{ objectFit: "cover" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text view="primary-small">Без комиссий</Typography.Text>
            <Gap size={4} />
            <Typography.Text color="secondary" view="primary-small">
              Пополнять можно с любого банка
            </Typography.Text>
          </div>
        </div>

        <Gap size={16} />

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <img src={image9} alt="" width={48} height={48} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text view="primary-small">
              Быстрый старт
            </Typography.Text>
            <Gap size={4} />
            <Typography.Text color="secondary" view="primary-small">
              Копилка откроется за 1 минуту
            </Typography.Text>
          </div>
        </div>
      </div>

      <Gap size={16} />

      <div style={{ padding: "0 16px" }}>
        <Textarea
          value={value}
          onInput={(e: FormEvent<HTMLTextAreaElement>) => {
            const input = e.target as HTMLInputElement;

            setValue(input.value);
          }}
          onClick={() => setLabel("")}
          onBlur={() => {
            if (value.length !== 0) {
              setLabel("");
            } else {
              setLabel("Напишите цель. Например, Саше на новый велосипед");
            }
          }}
          label={label}
          block={true}
          minRows={10}
          maxLength={500}
          showCounter={true}
        />
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile block view="primary" loading={loading} onClick={submit}>
          Хотим участвовать!
        </ButtonMobile>
      </div>
    </>
  );
};
