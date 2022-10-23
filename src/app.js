import { ui } from "./ui";
import { http } from "./http";

document.addEventListener("DOMContentLoaded", getPosts);

ui.post_submit_btn.addEventListener("click", submitPostHandler);

ui.post_collection.addEventListener("click", enableEditPostHandler);

ui.post_btn_group.addEventListener("click", cancelEditPostHandler);

ui.post_collection.addEventListener("click", deletePostHandler);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((err) => ui.showAlert(err, "alert-danger mt-1"));
}

function submitPostHandler(e) {
  if (ui.validateInputFields()) {
    const post_data = {
      title: ui.post_title.value,
      body: ui.post_body.value,
    };
    if (ui.post_id.value == "") {
      http
        .post("http://localhost:3000/posts", post_data)
        .then((data) => {
          getPosts();
          ui.clearFields();
          ui.showAlert("Post added successfully.", "alert-success mt-1");
        })
        .catch((err) => ui.showAlert(err, "alert-danger mt-1"));
    } else {
      http
        .put(`http://localhost:3000/posts/${ui.post_id.value}`, post_data)
        .then((post_data) => {
          getPosts();
          ui.changeFormState("add");
          ui.showAlert("Post updated successfully.", "alert-success mt-1");
        })
        .catch((err) => ui.showAlert(err, "alert-danger mt-1"));
    }
  }
  e.preventDefault();
}

function enableEditPostHandler(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("edit-post")) {
    const id = e.target.parentElement.dataset.post_id;
    const post_title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const post_body = e.target.parentElement.previousElementSibling.textContent;
    const post_edit_data = {
      id,
      post_title,
      post_body,
    };
    ui.fillPostForm(post_edit_data);
  }
}

function cancelEditPostHandler(e) {
  e.preventDefault();
  if (e.target.classList.contains("post-cancel-btn")) {
    ui.changeFormState("add");
  }
}

function deletePostHandler(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete-post")) {
    const id = e.target.parentElement.dataset.post_id;
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          getPosts();
          ui.changeFormState("add");
          ui.showAlert("Post deleted successfully.", "alert-success mt-1");
        })
        .catch((err) => ui.showAlert(err, "alert-danger mt-1"));
    }
  }
}
