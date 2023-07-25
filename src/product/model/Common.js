import Swal from "sweetalert2";
import axios from "axios";

export function deleteById(id) {
    Swal.fire({
        position: 'top-end',
        title: 'Do you want to delete this student?',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: 'Cancel',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            axios.delete(`http://localhost:8080/api/students/${id}`).then(() => {
                Swal.fire({
                    width: '450px',
                    position: 'top-end',
                    title: 'Deleted!',
                    icon: 'success'
                })
            })
        } else if (result.isDenied) {
            Swal.fire({
                width: '450px',
                position: 'top-end',
                title: 'Canceled!',
                icon: 'info'
            })
        }
    })
}
