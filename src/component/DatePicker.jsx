"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerCard() {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="w-full text-black rounded-md bg-white dark:bg-gray-700 dark:text-gray-100 outline-none"
            placeholderText="12/25"
            id="date-of-birth"
        />

    );
}
