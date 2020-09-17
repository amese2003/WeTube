import axios from "axios";
const commentList = document.getElementById("jsCommentList")
const commentNumber = document.getElementById("jsCommentNumber")

const removeCommentButton = document.querySelectorAll(".fa-times");


const removeComment = async (element) => {
    let videoId = window.location.href.split("/videos/")[1];

    const response = await axios({
        url: `/api/${videoId}/comment/remove`,
        method:'post', 
        data: {
            commentId : element.id
        }
    });

    console.log("fist");

    if (response.status === 200) {
        element.remove();
        commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
    }
}


const handleSubmit = (event) => {
    event.preventDefault();
    removeComment(event.path[2]);
}

function init() {
    removeCommentButton.forEach((element) => {
        element.addEventListener("click", handleSubmit);
    });
}

if (removeCommentButton) {
    init();
}