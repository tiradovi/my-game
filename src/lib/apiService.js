
export const GameAPI = {
    getScores: async () => {
        try {
            const res = await fetch('/api/scores', {
                cache: 'no-store',
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }
            return await res.json();
        } catch (error) {
            console.error('점수 불러오기 에러:', error);
            return [];
        }
    },
    saveScore: async (name, attempts) => {
        try {
            const res = await fetch(`/api/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, attempts})
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }
            return true;
        } catch (error) {
            console.error('점수 저장 에러:', error);
            return false;
        }
    }
}