import Swal from "sweetalert2";

function SweetAlert(message, icon) {
  Swal.fire({
    position: "center",
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 1000,
  });
}

export { SweetAlert };
