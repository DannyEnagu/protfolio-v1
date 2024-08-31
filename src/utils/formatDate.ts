import { DateField, isFilled } from "@prismicio/client";

export const formatDate = (date: DateField) => {
    if (isFilled.date(date)) {
      const newDate = new Date(date);
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      return new Intl.DateTimeFormat("en-US", dateOptions).format(newDate);
    }
  }