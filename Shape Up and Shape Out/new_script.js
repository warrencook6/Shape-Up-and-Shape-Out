document.addEventListener("DOMContentLoaded", function () {

    var inputSquareSide = document.getElementById('drawSquare');
    var inputRectHeight = document.getElementById('recH');
    var inputRectWidth = document.getElementById('recW');
    var inputCircRadius = document.getElementById('radius');
    var inputTriHeight = document.getElementById('tangle');


    var labelShapeName = document.getElementById('shape-name');
    var labelWidth = document.getElementById('Width');
    var labelHeight = document.getElementById('Height');
    var labelRadius = document.getElementById('Radius');
    var labelArea = document.getElementById('Area');
    var labelPerimeter = document.getElementById('Perimeter');

    var drawingBox = document.getElementById('drawingBox');

    document.getElementById('submitSquare').addEventListener('click', createSquare);
    document.getElementById('submitRec').addEventListener('click', createRectangle);
    document.getElementById('drawTriangle').addEventListener('click', createTriangle);
    document.getElementById('drawCircle').addEventListener('click', createCircle);


    var Shape = function (width, height) {
        this.width = width;
        this.height = height;

    }
    Shape.prototype.draw = function () {
        this.div = document.createElement('div');
        this.div.classList.add('shape');
        this.div.classList.add(this.cssClass);
        this.div.addEventListener('click', this.describe.bind(this));
        this.div.addEventListener('dblclick', function () {
            this.remove();
        });
        this.div.style.width = this.width + 'px';
        this.div.style.height = this.height + 'px';
        var x = Math.floor(Math.random() * (600 - this.width));
        var y = Math.floor(Math.random() * (600 - this.height));
        this.div.style.top = y + 'px';
        this.div.style.left = x + 'px';
        drawingBox.appendChild(this.div);
    }

    Shape.prototype.describe = function () {
        labelShapeName.innerHTML = this.constructor.name;
        labelWidth.innerHTML = this.width;
        labelHeight.innerHTML = this.height;
        labelRadius.innerHTML = this.radius;
        labelArea.innerHTML = this.area();
        labelPerimeter.innerHTML = this.perimeter();
    }

    var Circle = function (radius) {
        Shape.call(this, radius * 2, radius * 2);
        this.radius = radius;
        this.cssClass = 'circle';
        this.draw();
    }

    Circle.prototype = Object.create(Shape.prototype);
    Circle.prototype.constructor = Circle;

    Circle.prototype.area = function () {
        return Math.PI * this.radius * this.radius;
    }

    Circle.prototype.perimeter = function () {
        return 2 * Math.PI * this.radius;
    }

    var Triangle = function (height) {
        Shape.call(this, height, height);
        this.cssClass = 'triangle';
        this.draw();
        this.div.style.width = '0';
        this.div.style.height = '0';
        this.div.style.borderRightWidth = height + 'px';
        this.div.style.borderBottomWidth = height + 'px';
    }

    Triangle.prototype = Object.create(Shape.prototype);
    Triangle.prototype.constructor = Triangle;

    Triangle.prototype.area = function () {
        return 0.5 * this.height * this.height;
    }

    Triangle.prototype.perimeter = function () {
        return 2 * this.height + Math.sqrt(2) * this.height;
    }

    var Rectangle = function (width, height) {
        Shape.call(this, width, height);
        this.cssClass = 'rectangle';
        this.draw();
    }

    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    Rectangle.prototype.area = function () {
        return this.width * this.height;
    }

    Rectangle.prototype.perimeter = function () {
        return 2 * this.width + 2 * this.height;
    }

    var Square = function (sideLength) {
        Rectangle.call(this, sideLength, sideLength);
        this.cssClass = 'square';
        this.div.classList.remove('rectangle');
        this.div.classList.add('square');
    }

    Square.prototype = Object.create(Rectangle.prototype);
    Square.prototype.constructor = Square;

    function createSquare() {
        new Square(inputSquareSide.value);
    }

    function createRectangle() {
        new Rectangle(inputRectWidth.value, inputRectHeight.value);
    }

    function createTriangle() {
        new Triangle(inputTriHeight.value);
    }

    function createCircle() {
        new Circle(inputCircRadius.value);
    }
});
