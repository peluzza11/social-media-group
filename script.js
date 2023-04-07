
//previews an image before the user post
function previewImage() 
{
    // Gets file input 
    let postFile = document.getElementById("post-file");
    // Grab image element
    let postImage = document.getElementById("post-image");
    // Grab the first file from the file input
    let file = postFile.files[0];

    // Checks to see if the file seleced is a image
    if (file && file.type.match("image.*")) 
    {
    
        let reader = new FileReader();
        
        reader.onload = function(e) 
        {

            postImage.src = e.target.result;
            // Displays image element
            postImage.style.display = "block";
        };
        // Read the file as a data URL
        reader.readAsDataURL(file);
    } else 
    {

        postImage.style.display = "none";
    }
}



//Post creater
function createPost() {
    // Gets the input element
    let postInput = document.getElementById("post-input");
    // Gets the input value
    let postText = postInput.value;
    // Gets the file input element
    let postFile = document.getElementById("post-file");
    
    let file = postFile.files[0];

    // Checks to see that if user text input and image input is empty
    if (!postText && !file) 
    {
        alert("Your post is empty. Please write something or upload an image.");

        return;
    }
    
    // Grabs the the comment section element which is an empty element
    let commentSection = document.getElementById("comment-section");
    let post = document.createElement("div");
    post.className = "post";
    post.style.border = "1px solid black";
    post.style.margin = "10px";
    post.style.padding = "10px";
    
    // Checks to see if the input value is not empty
    if (postText) 
    {
        let postContent = document.createElement("p");
        postContent.textContent = postText;
        post.appendChild(postContent);
    }
    
    // Checks to see if the file being uploaded is a image file
    if (file && file.type.match("image.*")) 
    {
        let reader = new FileReader();
        reader.onload = function(e) {
            // Makes am new image element for the post image to display
            let newImage = document.createElement("img");
            newImage.src = e.target.result;
            newImage.style.width = "200px";
            newImage.style.height = "200px";
            newImage.style.objectFit = "cover";
            post.appendChild(newImage);
        };
    
        reader.readAsDataURL(file);
    }
    
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function() 
     {
         commentSection.removeChild(post);
         updateTotalComments();
     });
     
      post.appendChild(deleteButton);
      commentSection.appendChild(post);
      updateTotalComments();
      postInput.value = "";
      postFile.value = "";
    let postImage = document.getElementById("post-image");
    postImage.style.display = "none";
    postImage.src = "";
 }



// A function to update the total comments count
function updateTotalComments()
{
    let totalComments = document.getElementById("total-comments");
    let commentSection = document.getElementById("comment-section");
    let numPosts = commentSection.childElementCount;
    totalComments.textContent = numPosts;
}


