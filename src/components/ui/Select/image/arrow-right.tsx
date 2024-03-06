export default function ArrowRight({ className = '' }: { className?: string }) {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M0.315399 4.93197C0.315399 4.81997 0.371399 4.76397 0.483399 4.76397H7.27339L4.4454 1.97797C4.3614 1.9033 4.3614 1.82397 4.4454 1.73997L5.17339 1.02597C5.25739 0.951303 5.33669 0.951303 5.41139 1.02597L9.62539 5.35197C9.69069 5.43597 9.69069 5.51527 9.62539 5.58997L5.41139 9.91597C5.33669 9.99067 5.25739 9.99067 5.17339 9.91597L4.4454 9.20197C4.3614 9.12727 4.3614 9.05267 4.4454 8.97797L7.27339 6.19197H0.483399C0.371399 6.19197 0.315399 6.13597 0.315399 6.02397V4.93197Z"
                fill="currentColor"
            />
        </svg>
    );
}
