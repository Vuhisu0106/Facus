function Shape({ width, height, top, bottom, left, right, color, blur }) {
    return (
        <div
            style={{
                height: `${height}px`,
                width: `${width}px`,
                top: `${top}px`,
                bottom: `${bottom}px`,
                left: `${left}px`,
                right: `${right}px`,
                background: `${color}`,
                borderRadius: `50%`,
                position: 'absolute',
                mixBlendMode: 'multiply',
                filter: `blur(${blur}px)`,
            }}
        ></div>
    );
}

export default Shape;
