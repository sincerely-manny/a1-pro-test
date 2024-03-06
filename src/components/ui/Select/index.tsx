'use client';

import { type StaticImageData } from 'next/image';
import {
    Children,
    cloneElement,
    isValidElement,
    useRef,
    useState,
    type ReactElement,
    type ReactNode,
    useEffect,
} from 'react';
// import ArrowRight from './image/arrow-right.svg';
import Border from './image/border.svg';
import ArrowRight from './image/arrow-right';

type RootProps = {
    name: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    children: React.ReactNode;
};

const POPUP_OFFSET_TOP = 6; // px

function Root({ name, value = undefined, defaultValue = undefined, onChange = undefined, children }: RootProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popOverRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [intValue, setIntValue] = useState(value ?? defaultValue);

    const open = () => {
        setIsOpen(true);
    };
    const close = () => {
        popOverRef.current?.addEventListener(
            'animationend',
            () => {
                setIsOpen(false);
            },
            { once: true },
        );
        popOverRef.current?.setAttribute('data-hidden', 'true');
    };
    const handleClickOutside = (e: MouseEvent) => {
        if (
            isOpen &&
            !popOverRef.current?.contains(e.target as Node) &&
            !buttonRef.current?.contains(e.target as Node)
        ) {
            close();
        }
    };
    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    });

    /* GUARD RAILS */
    if (value !== undefined && defaultValue !== undefined) {
        throw new Error('Select: cannot use both value and defaultValue props');
    }
    if (value !== undefined && onChange === undefined) {
        throw new Error('Select: cannot use value prop without onChange prop');
    }
    if (value === undefined && defaultValue === undefined) {
        throw new Error('Select: must use either value or defaultValue prop');
    }
    if (
        value !== undefined &&
        !Children.toArray(children).some(
            (child) => isValidElement(child) && (child.props as OptionProps)?.value === value,
        )
    ) {
        throw new Error('Select: value prop must match one of the Option children');
    }
    /* /GUARD RAILS */

    const [displayedValue, setDispalyedValue] = useState<ReactNode>('');
    useEffect(() => {
        const values: Record<string, ReactNode> = {};
        Children.toArray(children)
            .filter((child) => {
                const c = child as ReactElement<OptionProps, typeof Option>;
                return c && c?.type?.name === 'Option';
            })
            .forEach((child) => {
                const { value: v, children: c } = (child as ReactElement<OptionProps, typeof Option>).props;
                values[v] = c;
            });

        setDispalyedValue(values[value ?? intValue ?? ''] ?? 'Select an option');
    }, [intValue, value, children]);

    const childrenWithProps = Children.map(children, (child) => {
        if (isValidElement(child) && (child.type as { name?: string })?.name === 'Option') {
            return cloneElement<OptionProps>(child as ReactElement<OptionProps, typeof Option>, {
                selected: (child.props as OptionProps)?.value === intValue,
                onClick: (v) => {
                    setIntValue(v);
                    if (onChange) {
                        onChange(v);
                    }
                    close();
                },
            });
        }
        return child;
    });

    const getPopOverPosition = () => {
        const [x, y, width] = [
            buttonRef.current?.offsetLeft ?? 0,
            (buttonRef.current?.offsetTop ?? 0) + (buttonRef.current?.offsetHeight ?? 0) + POPUP_OFFSET_TOP,
            buttonRef.current?.offsetWidth ?? 0,
        ];
        return { x, y, width };
    };
    const [popOverPosition, setPopOverPosition] = useState(getPopOverPosition());

    const handleClick = () => {
        setPopOverPosition(getPopOverPosition());
        const toggle = isOpen ? close : open;
        toggle();
    };
    return (
        <>
            <button
                className="text-grey bg-primary-1/10 hover:bg-primary-1/30 roun relative w-60 py-2 text-center text-sm font-semibold uppercase transition-colors"
                type="button"
                onClick={handleClick}
                ref={buttonRef}
                style={{ backgroundImage: `url('${(Border as StaticImageData).src}')`, backgroundSize: '100% 100%' }}
            >
                {displayedValue}
            </button>
            {isOpen ? (
                <ul
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={name}
                    ref={popOverRef}
                    className="divide-grey/10 text-grey animate-fadeIn data-[hidden=true]:animate-fadeOut border-primary-2/20 absolute z-30 flex flex-col divide-y rounded border border-b-0 bg-black text-sm "
                    data-hidden="false"
                    style={{
                        top: popOverPosition.y,
                        left: popOverPosition.x,
                        minWidth: popOverPosition.width,
                    }}
                >
                    {childrenWithProps}
                </ul>
            ) : null}
        </>
    );
}

type OptionProps = {
    value: string;
    children: React.ReactNode;
    selected?: boolean;
    onClick?: (value: string) => void;
};
function Option({ value, children, selected = false, onClick = () => {} }: OptionProps) {
    return (
        <li>
            <button
                role="menuitemradio"
                aria-checked={selected}
                type="button"
                className="hover:bg-grey/10 aria-[checked=true]:text-primary-1 inset-0 flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left uppercase transition-colors aria-[checked=true]:pointer-events-none"
                onClick={() => onClick(value)}
            >
                <span>{children}</span>
                {/* <Image src={ArrowRight as StaticImageData} alt="arrow right" className="text-white" /> */}
                <ArrowRight aria-hidden="true" className="" />
            </button>
        </li>
    );
}

const Select = {
    Option,
    Root,
};
export default Select;
