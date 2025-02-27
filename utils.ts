import React, { Children } from 'react';
interface IEach<T> {
    of: T[];
    render: (e: T, i: number) => React.JSX.Element;
}
export const EachElement = <T>({
    of,
    render
}: IEach<T>
) => Children.toArray(of.map(render));

