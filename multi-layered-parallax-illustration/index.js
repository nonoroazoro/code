const layers = document.querySelectorAll(`[data-type="parallax"]`);
window.addEventListener("scroll", (e) =>
{
    let movement;
    const top = window.scrollY;
    for (const layer of layers)
    {
        movement = -(top * layer.dataset["depth"]);
        layer.style["transform"] = `translate(0, ${movement}px)`;
    }
});
