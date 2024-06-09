var calTX = (width,height,positionX, angle) => {
    const rad = (Math.abs(angle) * Math.PI) / 180;
    console.log("rad : " , rad );
        
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);

    const centerX = width / 2;
    const centerY = height / 2;

    let translateX = 0;
    if(angle < 0 ){
        translateX = positionX - ((sin * centerX) - (cos * centerY) + centerY);
    }else{
        translateX = positionX - ((sin * centerX) - (cos * centerY) - centerY);
    }
    console.log("translateX : ", translateX);
}