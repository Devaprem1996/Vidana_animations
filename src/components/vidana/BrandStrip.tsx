import React from 'react';

const BRANDS = [
    "HWASHIN", "BEML", "GEBA", "SUNGWOO", "indotech", "Ascend",
    "Ascend", "HWASHIN", "BEML", "GEBA", "SUNGWOO", "indotech",
];

export const BrandStrip = () => {
    return (
        <div className="py-24 overflow-hidden bg-primary text-primary-foreground">
            <div className="relative w-full flex">
                <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
                    {BRANDS.map((brand, i) => (
                        <span key={i} className="text-4xl md:text-6xl font-display font-bold uppercase opacity-50 hover:opacity-100 transition-opacity cursor-default">
                            {brand}
                        </span>
                    ))}
                    {BRANDS.map((brand, i) => (
                        <span key={`dup-${i}`} className="text-4xl md:text-6xl font-display font-bold uppercase opacity-50 hover:opacity-100 transition-opacity cursor-default">
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
