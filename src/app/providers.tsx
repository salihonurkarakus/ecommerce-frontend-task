// src/app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  messages: AbstractIntlMessages; // any yerine
  locale: string;
};

export default function Providers({ children, messages, locale }: Props) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </Provider>
  );
}
