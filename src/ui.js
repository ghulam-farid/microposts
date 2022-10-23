class UI {
  constructor() {
    this.post_content = document.querySelector(".post-content");
    this.post_title = document.querySelector("#post-title");
    this.post_body = document.querySelector("#post-body");
    this.post_id = document.querySelector("#post-id");
    this.post_submit_btn = document.querySelector(".post-submit-btn");
    this.post_btn_group = document.querySelector(".post-btn-group");
    this.post_collection = document.querySelector("#post-collection");
  }
  validateInputFields() {
    if (this.post_title.value == "" || this.post_body.value == "") {
      this.showAlert(`Please fill in the fields.`, "alert-danger mt-1");
      return false;
    }
    return true;
  }
  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.innerHTML = `<i class="fa-solid fa-circle-exclamation text-${className.split('-')[1]}"></i> ${message}`;
    this.post_content.insertBefore(div, this.post_collection);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  showPosts(posts) {
    let output = "";
    posts.forEach((post) => {
      output += `
         <div class="card mb-3">
            <div class="card-body mb-3">
               <h4 class="card-title">${post.title}</h4>
               <p class="card-text">${post.body}</p>
               <a href="#" class="edit-post card-link" data-post_id="${post.id}"
               ><i class="fa-solid fa-pencil"></i
               ></a
               ><a href="#" class="delete-post card-link" data-post_id="${post.id}"
               ><i class="fa-solid fa-trash"></i
               ></a>
            </div>
         </div>
         `;
    });
    this.post_collection.innerHTML = output;
  }
  clearFields() {
    this.post_title.value = "";
    this.post_body.value = "";
  }
  fillPostForm(post_edit_data) {
    this.post_title.value = post_edit_data.post_title;
    this.post_body.value = post_edit_data.post_body;
    this.post_id.value = post_edit_data.id;
    this.changeFormState("edit");
  }
  changeFormState(state) {
    if (state == "edit") {
      this.post_submit_btn.textContent = "Update Post";
      this.post_submit_btn.className = "btn btn-warning post-update-btn";
      const cancel_btn = document.createElement("button");
      cancel_btn.className = "btn btn-secondary post-cancel-btn";
      cancel_btn.textContent = "Cancel";
      this.post_btn_group.appendChild(cancel_btn);
    }else{
      this.post_submit_btn.textContent = 'Post It';
      this.post_submit_btn.className = 'btn btn-primary post-submit-btn';
      if(document.querySelector('.post-cancel-btn')){
         document.querySelector('.post-cancel-btn').remove();
      }
      this.clearFields();
      this.clearIdField();
   }
  }
   clearIdField() {
      this.post_id.value = '';
   }
}

export const ui = new UI();
