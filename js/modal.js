function openModal(imagePath, caption){
    // Get the modal
    var modal = document.getElementById("modalImageContainer");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("modal-content-image");

    modal.style.display = "block";
    modalImg.src = imagePath;

    // Get the <span> element that closes the modal
    var span = document.getElementById("closeImage");

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
}

function openCalc(){
    // Get the modal
    var modal = document.getElementById("modalCalcContainer");
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    var span = document.getElementById("closeCalc");

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
}