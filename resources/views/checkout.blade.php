<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/css/app.css">
        <title>بررسی پاسخ ها</title>
        <style>
        @keyframes shake {
	25% {
		transform: rotate(calc(var(--angle) * -1));
	}

	50% {
		transform: rotate(var(--angle));
	}

	100% {
		transform: rotate(0deg);
	}
}





.display {
	display: grid;
	grid-template-columns: 50% 50%;
	gap: 0.1em;
}

.HOVER {
	--width: 100%;
	--time: 0.7s;

	position: relative;
	display: inline-block;
	border : solid 0;
	border-radius : 1000px;
	height: 1em;
	padding-left:2em;
	padding-right:2em;
	padding-top:2em;
	padding-bottom:2em;
	color: white;
	background: #222;
	overflow: hidden;
}

.HOVER text {
	position: relative;
	z-index: 5;
	transition: color var(--time);
}

.HOVER:hover text {
	color: #222;
}

.HOVER span {
	border-radius: 100%;
	position: absolute;
	display: block;
	content: "";
	z-index: 0;
	width: 0;
	height: 0;

	background: #00bcd2;
	transform: translate(-50%, -50%);
	transition: width var(--time), padding-top var(--time);
}

.HOVER:hover span {
	width: calc(var(--width) * 2.25);
	padding-top: calc(var(--width) * 2.25);
}

.HOVER.FLASH:hover text {
	color: white;
}

.HOVER.FLASH span {
	background: #ff3b3b;
}

.animated {
	--angle: 5deg;
	animation: shake 0.3s;
}
        </style>
    </head>
    <body style="background-color : white;background-image : none">
        <div id="checkout-container"></div>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
        <script src="/js/app.js?version=1.1.9" ></script>
        <script>
        const ANIMATEDCLASSNAME = "animated";
const ELEMENTS = document.querySelectorAll(".HOVER");
const ELEMENTS_SPAN = [];

ELEMENTS.forEach((element, index) => {
	let addAnimation = false;
	// Elements that contain the "FLASH" class, add a listener to remove
	// animation-class when the animation ends
	if (element.classList[1] == "FLASH") {
		element.addEventListener("animationend", e => {
			element.classList.remove(ANIMATEDCLASSNAME);
		});
		addAnimation = true;
	}

	// If The span element for this element does not exist in the array, add it.
	if (!ELEMENTS_SPAN[index])
		ELEMENTS_SPAN[index] = element.querySelector("span");

	element.addEventListener("mouseover", e => {
		ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + "px";
		ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + "px";

		// Add an animation-class to animate via CSS.
		if (addAnimation) element.classList.add(ANIMATEDCLASSNAME);
	});

	element.addEventListener("mouseout", e => {
		ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + "px";
		ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + "px";
	});
});

        </script>

    </body>

</html>
