import React from 'react';
import clsx from 'clsx';

interface BoundaryProps {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}

const Boundary = React.forwardRef<HTMLDivElement, BoundaryProps>(({
    as: Comp = 'section',
    children,
    className,
    ...restProps
}, ref) => {
    return (
        <Comp
            ref={ref}
            className={clsx('px-4 py-10 md:px-6 md:py-14 lg:py-16', className)}
            {...restProps}
        >
            <div className="mx-auto w-full max-w-7xl">
                {children}
            </div>
        </Comp>
    );
});

Boundary.displayName = 'Boundary';

export default Boundary;