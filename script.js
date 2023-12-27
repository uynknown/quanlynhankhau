    let users = [];

    function addUser() {
        const fullName = document.getElementById('fullName').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const dob = `${day}-${month}-${year}`;
        const gender = document.getElementById('gender').value;
        const hometown = document.getElementById('hometown').value;
        const ethnicity = document.getElementById('ethnicity').value;
        const religion = document.getElementById('religion').value;
        const nationality = document.getElementById('nationality').value;
        const idCard = document.getElementById('idCard').value;
        const passport = document.getElementById('passport').value;
        const permanentAddress = document.getElementById('permanentAddress').value;
        const currentAddress = document.getElementById('currentAddress').value;
        const education = document.getElementById('education').value;
        const occupation = document.getElementById('occupation').value;
        const workPlace = document.getElementById('workPlace').value;
    
        // Check for duplicate ID card (CMND) or passport entries
        if (isDuplicateIdCard(idCard) || isDuplicatePassport(passport)) {
            alert('ID card (CMND) or passport number already exists. Please provide a unique ID card or passport number.');
            return;
        }
    
        const user = {
            fullName: fullName,
            dob: dob,
            gender: gender,
            hometown: hometown,
            ethnicity: ethnicity,
            religion: religion,
            nationality: nationality,
            idCard: idCard,
            passport: passport,
            permanentAddress: permanentAddress,
            currentAddress: currentAddress,
            education: education,
            occupation: occupation,
            workPlace: workPlace,
        };
    
        users.push(user);
        displayUsers();
        clearForm();
    }


        function displayUsers(filteredUsers) {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';

            const displayList = filteredUsers || users;

            for (const user of displayList) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.fullName}</td>
                    <td>${user.dob}</td>
                    <td>${user.gender}</td>
                    <td>${user.placeOfBirth}</td>
                    <td>${user.hometown}</td>
                    <td>${user.ethnicity}</td>
                    <td>${user.religion}</td>
                    <td>${user.nationality}</td>
                    <td>${user.idCard}</td>
                    <td>${user.passport}</td>
                    <td>${user.permanentAddress}</td>
                    <td>${user.currentAddress}</td>
                    <td>${user.education}</td>
                    <td>${user.occupation}</td>
                    <td>${user.workPlace}</td>
                    <!-- Thêm các ô dữ liệu khác tương tự ở đây -->
                    <td>
                        <button onclick="editUser('${user.fullName}')">Sửa</button>
                        <button onclick="deleteUser('${user.fullName}')">Xóa</button>
                    </td>
                `;
                userList.appendChild(row);
            }
        }

        function clearForm() {
            document.getElementById('userInfoForm').reset();
        }

        function editUser(fullName) {
            const user = users.find(u => u.fullName === fullName);
        
            if (user) {
                document.getElementById('fullName').value = user.fullName;
        
                // Split the date of birth to populate day, month, and year fields
                const dobParts = user.dob.split('-');
                document.getElementById('day').value = dobParts[0];
                document.getElementById('month').value = dobParts[1];
                document.getElementById('year').value = dobParts[2];
        
                document.getElementById('gender').value = user.gender;
                document.getElementById('hometown').value = user.hometown;
                document.getElementById('ethnicity').value = user.ethnicity;
                document.getElementById('religion').value = user.religion;
                document.getElementById('nationality').value = user.nationality;
                document.getElementById('idCard').value = user.idCard;
                document.getElementById('passport').value = user.passport;
                document.getElementById('permanentAddress').value = user.permanentAddress;
                document.getElementById('currentAddress').value = user.currentAddress;
                document.getElementById('education').value = user.education;
                document.getElementById('occupation').value = user.occupation;
                document.getElementById('workPlace').value = user.workPlace;
        
                // You can add additional fields if needed
        
                // Change the "Thêm" (Add) button to "Cập nhật" (Update) button
                const addButton = document.querySelector('button[type="button"]');
                addButton.textContent = 'Cập nhật';
                addButton.onclick = function () {
                    updateUserInfo(fullName);
                };
            }
        }
        
        function updateUserInfo(fullName) {
            const userIndex = users.findIndex(u => u.fullName === fullName);
        
            const updatedIdCard = document.getElementById('idCard').value;
            const updatedPassport = document.getElementById('passport').value;
        
            // Check for duplicate ID card (CMND) or passport entries
            if (
                (updatedIdCard !== users[userIndex].idCard && isDuplicateIdCard(updatedIdCard)) ||
                (updatedPassport !== users[userIndex].passport && isDuplicatePassport(updatedPassport))
            ) {
                alert('ID card (CMND) or passport number already exists. Please provide a unique ID card or passport number.');
                return;
            }
        
            users[userIndex].fullName = document.getElementById('fullName').value;
            users[userIndex].dob = `${document.getElementById('day').value}-${document.getElementById('month').value}-${document.getElementById('year').value}`;
            users[userIndex].gender = document.getElementById('gender').value;
            users[userIndex].hometown = document.getElementById('hometown').value;
            users[userIndex].ethnicity = document.getElementById('ethnicity').value;
            users[userIndex].religion = document.getElementById('religion').value;
            users[userIndex].nationality = document.getElementById('nationality').value;
            users[userIndex].idCard = updatedIdCard;
            users[userIndex].passport = updatedPassport;
            users[userIndex].permanentAddress = document.getElementById('permanentAddress').value;
            users[userIndex].currentAddress = document.getElementById('currentAddress').value;
            users[userIndex].education = document.getElementById('education').value;
            users[userIndex].occupation = document.getElementById('occupation').value;
            users[userIndex].workPlace = document.getElementById('workPlace').value;
        
            displayUsers();
            clearForm();
            const addButton = document.querySelector('button[type="button"]');
            addButton.textContent = 'Thêm';
            addButton.onclick = addUser;
        }
        
        function isDuplicateIdCard(idCard) {
            return users.some(user => user.idCard === idCard);
        }
        
        function isDuplicatePassport(passport) {
            return users.some(user => user.passport === passport);
        }
        


        function deleteUser(fullName) {
            // Xóa người dùng theo tên đầy đủ
            users = users.filter(u => u.fullName !== fullName);
            displayUsers();
        }

        function removeDiacritics(str) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        
        function searchUser() {
            const searchInput = removeDiacritics(document.getElementById('searchInput').value.toLowerCase());
            const filteredUsers = users.filter(
                (u) =>
                    removeDiacritics(u.fullName.toLowerCase()).includes(searchInput) ||
                    removeDiacritics(u.idCard.toLowerCase()).includes(searchInput)
            );
            displayUsers(filteredUsers);
        }
        

        // Một số dữ liệu mẫu để kiểm thử
        users.push({
            fullName: 'Nguyễn Văn A',
            dob: '01-01-1990',
            gender: 'Nam',
            placeOfBirth: 'Hà Nội',
            hometown: 'Hà Nội',
            ethnicity: 'Kinh',
            religion: 'Không',
            nationality: 'Việt Nam',
            idCard: '123456789',
            passport: 'VN123456',
            permanentAddress: 'Hà Nội',
            currentAddress: 'Hồ Chí Minh',
            education: 'Đại học',
            occupation: 'Kỹ sư',
            workPlace: 'Công ty ABC',
        });
        users.push({
            fullName: 'Trần Thị B',
            dob: '15-05-1995',
            gender: 'Nữ',
            placeOfBirth: 'Hồ Chí Minh',
            hometown: 'Hồ Chí Minh',
            ethnicity: 'Kinh',
            religion: 'Phật tử',
            nationality: 'Việt Nam',
            idCard: '987654321',
            passport: 'VN654321',
            permanentAddress: 'Hồ Chí Minh',
            currentAddress: 'Hà Nội',
            education: 'Cao đẳng',
            occupation: 'Nhân viên văn phòng',
            workPlace: 'Công ty XYZ',
        });
        users.push({
            fullName: 'Lê Minh C',
            dob: '20-11-1989',
            gender: 'Nam',
            placeOfBirth: 'Đà Nẵng',
            hometown: 'Đà Nẵng',
            ethnicity: 'Kinh',
            religion: 'Tin lành',
            nationality: 'Việt Nam',
            idCard: '111222333',
            passport: 'VN333222',
            permanentAddress: 'Đà Nẵng',
            currentAddress: 'Hồ Chí Minh',
            education: 'Thạc sĩ',
            occupation: 'Giáo viên',
            workPlace: 'Trường Đại học ABC',
        });

        // Hiển thị danh sách người dùng khi trang web được tải
        displayUsers();