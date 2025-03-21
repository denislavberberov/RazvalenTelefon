import cursor from '../../assets/cursor.png';

const cursorState = {
    x: 0,
    y: 0
}

window.onmousemove = (event) => {
    document.querySelectorAll(".cursor").forEach((cursor, index) => {
        cursor.style.top = `${event.clientY+(5*index)+2}px`;
        cursor.style.left = `${event.clientX+(5*index)+2}px`;
    })
}

const AwesomeCursor = () => {
    return (
        <div id="cursor_container">
            <img src={cursor} class='cursor' />
        </div>
    )
}

export default AwesomeCursor;