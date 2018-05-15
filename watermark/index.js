function createWatermark(text, options)
{
    const DEFAULT_OPTIONS = {
        id: "watermark",
        container: null,
        style: {
            opacity: 0.15,
            pointerEvents: "none",
            position: "fixed",
            zIndex: 1024
        }
    };

    const imageUrl = createWatermarkImageUrl(text);
    if (imageUrl)
    {
        const opts = options ? Object.assign({}, DEFAULT_OPTIONS, options) : DEFAULT_OPTIONS;

        let container = opts.container;
        if (typeof container === "string")
        {
            container = document.querySelector(container);
        }
        container = container || document.body;

        const parentRect = container.getBoundingClientRect();
        opts.style.top = parentRect.top + "px";
        opts.style.left = parentRect.left + "px";
        opts.style.width = parentRect.width + "px";

        opts.style.height = parentRect.height + "px";
        if (container === document.body)
        {
            opts.style.height = "100%";
        }

        let waterMarker = document.getElementById(opts.id);
        if (!waterMarker)
        {
            waterMarker = document.createElement("div");
            waterMarker.id = opts.id;
            container.appendChild(waterMarker);
        }

        Object.assign(waterMarker.style, opts.style);
        waterMarker.style.background = "url(" + imageUrl + ") repeat top left";
    }
}

function createWatermarkImageUrl(text)
{
    const DEFAULT_OPTIONS = {
        width: 100,
        height: 100,
        font: "14px Times New Roman",
        fillStyle: "rgba(0, 0, 0, 0.1)"
    };

    if (text && typeof text === "string")
    {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        context.font = DEFAULT_OPTIONS.font;
        context.fillStyle = DEFAULT_OPTIONS.fillStyle;
        context.shadowBlur = 2;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;

        canvas.width = Math.max(Math.ceil(context.measureText(text).width), DEFAULT_OPTIONS.width);
        canvas.height = DEFAULT_OPTIONS.height;

        context.rotate(-20 * Math.PI / 180);
        context.fillText(text, 0, canvas.height / 2);

        return canvas.toDataURL();
    }
    return null;
}

createWatermark("watermark");
// createWatermark("watermark", { container: ".root" });
