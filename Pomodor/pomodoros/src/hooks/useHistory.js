import React, {useEffect, useState} from 'react'

const getToday = () => new Date().toISOString().split("T")[0];

function useHistory(username) {
    const [history, setHistory] = useState({});

    useEffect(() => {
        if (!username) return;

        const historyRaw = localStorage.getItem("pomodoroUserHistory");
        const allHistory = historyRaw ? JSON.parse(historyRaw) : {};
        const userHistory = allHistory[username] || {};
        setHistory(userHistory);
    }, [username]);

    const completeFocusSession = () => {
        const today = getToday();
        const username = localStorage.getItem("pomodoroUser");
        if (!username) return;

        const allHistory = JSON.parse(localStorage.getItem("pomodoroUserHistory")) || {};
        const userHistory = allHistory[username] || {};

        userHistory[today] = (userHistory[today] || 0) + 1;

        allHistory[username] = userHistory;
        localStorage.setItem("pomodoroUserHistory", JSON.stringify(allHistory));
        setHistory(userHistory);
    };

  return { history, completeFocusSession };


    /* const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('pomodoroHistory');
        return saved ? JSON.parse(saved) : {}
    });

    useEffect(() => {
        localStorage.setItem('pomodoroHistory', JSON.stringify(history));
    }, [history])

    const completeFocusSession = () => {
        const today = new Date().toISOString().slice(0, 10);
        setHistory((prev) => ({
            ...prev,
            [today]: (prev[today] || 0) + 1,
        }));
    }

    return {history, completeFocusSession} */
}

export default useHistory