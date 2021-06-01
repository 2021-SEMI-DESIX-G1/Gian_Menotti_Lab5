(() => {
    var App = {
        htmlElements: {
            studentForm: document.getElementById('student_form'),
            studentsList: document.getElementById('students_list'),
            studentsName: document.getElementById('student_name'),
            studentsAge: document.getElementById('student_age'),
            studentsHobbies: document.getElementById('student_hobbies'),
            studentId: document.getElementById('student_id')
                    },
        init: () => {
            // Bind events
            App.htmlElements.studentForm.addEventListener('submit', App.events.studentFormOnSubmit);
        },
        events: {
            studentFormOnSubmit: (event) => {
                event.preventDefault();
                const { 
                    student_name: studentNameInput,
                    student_age: studentAgeInput,
                    student_hobbies: studentHobbiesInput
                } = event.target.elements;
                const studentName = studentNameInput.value;
                const studentAge = studentAgeInput.value;
                const studentHobbies = studentHobbiesInput.value;
                App.utils.addStudentToList({ 
                    studentId: App.htmlElements.studentId,
                    tableBody: App.htmlElements.studentsList,
                    studentName,
                    studentAge,
                    studentHobbies,
                });
            },
            studentDelete: (event) => {
                event.preventDefault();
                const student_id = event.target.id;
                App.utils.deleteStudent(student_id);
            },
            studentUpdate: (event) => {     
                var x = event.target.id    ; 
                var str = x.replace("update_", "");
                
                event.preventDefault();
                const student_id = event.target.id;
                const studentName = document.getElementById('student_name_' + str).value;
                const studentAge = document.getElementById('student_age_' + str).value;
                const studentHobbies = document.getElementById('student_hobbies_' +str).value;
               
                console.log(studentName)
                App.utils.updateStudent(student_id, studentName, studentAge, studentHobbies);
            }
        },
        utils: {
            addStudentToList: ({ studentId, tableBody, studentName, studentAge, studentHobbies }) => {
                studentId.innerHTML = Number(studentId.innerHTML) + 1;
                const newRow = `<tr>
                                    <td><input class="form-control" id="student_name_${studentId.innerHTML}" type="text" value="${studentName}"></td>
                                    <td><input class="form-control" id="student_age_${studentId.innerHTML}" type="text" value="${studentHobbies}"></td>
                                    <td><input class="form-control" id="student_hobbies_${studentId.innerHTML}" type="text" value="${studentHobbies}"></td>
                                    <td><button type="button" id="delete_${studentId.innerHTML}">Eliminar</button></td>
                                    <td><button type="button" id="update_${studentId.innerHTML}">Actualizar</button></td>
                                </tr>`;
                tableBody.insertAdjacentHTML('beforeend', newRow);
                document.getElementById('delete_'+studentId.innerHTML).addEventListener('click', App.events.studentDelete);
                document.getElementById('update_'+studentId.innerHTML).addEventListener('click', App.events.studentUpdate);
            },
            deleteStudent: (studentId) => {
               
                parentCell = document.getElementById(studentId).parentElement;
                parentRow = parentCell.parentElement;
                parentRow.remove();
            },
            updateStudent: (studentId, studentName, studentAge, studentHobbies) => {
   
                parentCell = document.getElementById(studentId).parentElement
                parentRow = parentCell.parentElement;
                parentRow.cells[0].innerHTML = studentName;
                parentRow.cells[1].innerHTML = studentAge;
                parentRow.cells[2].innerHTML = studentHobbies;
                parentRow.cells[3] = `<button type="button" id="delete_${studentId.innerHTML}">Eliminar</button>`
                parentRow.cells[4] = `<button type="button" id="update_${studentId.innerHTML}">Actualizar</button></button>`
            }
        }
    }
    App.init();
})();