'use client';

import Select from '@/components/ui/Select';
import { useState } from 'react';

export default function UiSelect() {
    const [value1, setValue1] = useState('account-value');
    const [value2, setValue2] = useState('account-value');
    return (
        <div className="flex h-96 w-full gap-32 rounded bg-[#000] p-10">
            <div>
                <h2 className="mb-5 text-xl font-semibold text-white">Uncontrolled:</h2>
                <Select.Root name="select1" defaultValue={value1} onChange={setValue1}>
                    <Select.Option value="account-value">account</Select.Option>
                    <Select.Option value="wallet-value">wallet</Select.Option>
                    <Select.Option value="bonuses-value">bonuses</Select.Option>
                    <Select.Option value="bets-value">bets</Select.Option>
                    <Select.Option value="history-value">history</Select.Option>
                </Select.Root>
                <p className="mt-5 font-light text-white">Selected value: {value1}</p>
            </div>

            <div>
                <h2 className="mb-5 text-xl font-semibold text-white">Controlled:</h2>
                <Select.Root name="select2" value={value2} onChange={setValue2} key={value2}>
                    <Select.Option value="account-value">account</Select.Option>
                    <Select.Option value="wallet-value">wallet</Select.Option>
                    <Select.Option value="bonuses-value">bonuses</Select.Option>
                    <Select.Option value="bets-value">bets</Select.Option>
                    <Select.Option value="history-value">history</Select.Option>
                </Select.Root>
                <p className="mt-5 font-light text-white">Selected value: {value2}</p>
                <p className="mt-5 flex gap-2">
                    <button
                        onClick={() => setValue2('bets-value')}
                        type="button"
                        className="text-primary-1 border-primary-1 rounded border p-2"
                    >
                        Set to &ldquo;bets&rdquo;
                    </button>
                    <button
                        onClick={() => setValue2('history-value')}
                        type="button"
                        className="text-primary-1 border-primary-1 rounded border p-2"
                    >
                        Set to &ldquo;histiory&rdquo;
                    </button>
                </p>
            </div>
        </div>
    );
}
