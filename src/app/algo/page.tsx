'use client';

import { useState } from 'react';

function moveZeros(input: unknown[]) {
    let len = input.length;
    const output = [...input];
    for (let i = 0; i < len; ) {
        if (output[i] === 0) {
            output.splice(i, 1);
            output.push(0);
            len--;
        } else {
            i++;
        }
    }
    return JSON.stringify(output);
}

export default function Algo() {
    const input = '[false,1,0,1,2,0,1,3,"a"]';
    const output = moveZeros([false, 1, 0, 1, 2, 0, 1, 3, 'a']);
    const [inputValue, setInputValue] = useState(input);
    const [result, setResult] = useState(output);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setInputValue(value);
        try {
            const arr = JSON.parse(value) as unknown[];
            if (!Array.isArray(arr)) {
                throw new Error('Invalid input');
            }
            setResult(moveZeros(arr));
        } catch (error) {
            setResult('Invalid input');
        }
    };

    return (
        <>
            <form action="#" name="algo-form">
                <textarea
                    name="algo"
                    id="algo"
                    rows={2}
                    className="border-gray w-full rounded-lg border p-4"
                    placeholder="Input"
                    value={inputValue}
                    onChange={handleChange}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    autoComplete="off"
                />
            </form>
            <div className="mt-5">
                <h2 className="text-xl font-bold">Result:</h2>
                <p className="whitespace-pre">{result}</p>
            </div>
        </>
    );
}
