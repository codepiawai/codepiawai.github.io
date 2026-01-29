
const menuData = {
table: {
id: 'menu',
data: [
{ id: 1, induk: 0, nama: "Master", isi: 1, icon: "setting", url: "#" },
{ id: 2, induk: 1, nama: "Dashboard", isi: 1, icon: "house", url: "#" },
{ id: 3, induk: 0, nama: "Menu", isi: 2, icon: "menu", url: "#" },
{ id: 4, induk: 3, nama: "Users", isi: 3, icon: "person", url: "#" },
{ id: 5, induk: 3, nama: "Akses", isi: 4, icon: "lock", url: "#" },
{ id: 6, induk: 0, nama: "Setting", isi: 5, icon: "setting", url: "#" },
{ id: 7, induk: 6, nama: "Param", isi: 6, icon: "setting", url: "#" },
{ id: 8, induk: 6, nama: "Pesan", isi: 7, icon: "envelope", url: "#" }
]
}
};

const sidebarMenu = document.getElementById("sidebarMenu");
const menuWrapper = document.getElementById("menuWrapper");

function buildMenu(data) {
const parents = data.filter(item => item.induk === 0);
const children = data.filter(item => item.induk !== 0);

parents.forEach(parent => {
const li = document.createElement("li");
const submenu = children.filter(c => c.induk === parent.id);

if (submenu.length > 0) {
li.classList.add("menu-item", "has-collapsible");
li.setAttribute("data-name", parent.nama.toLowerCase());
li.innerHTML = `<a href="#"><span></span>${parent.nama}</a>`;
const ul = document.createElement("ul");
ul.classList.add("menu-child");

submenu.forEach(child => {
const subLi = document.createElement("li");
subLi.classList.add("menu-child-item");
subLi.setAttribute("data-name", child.nama.toLowerCase());
subLi.innerHTML = `<a href="${child.url}">${child.nama}</a>`;
ul.appendChild(subLi);
});

li.appendChild(ul);
} else {
li.classList.add("menu-item");
li.setAttribute("data-name", parent.nama.toLowerCase());
li.innerHTML = `<a class="menu-link" href="${parent.url}">${parent.nama}</a>`;
}

sidebarMenu.appendChild(li);
});
}

buildMenu(menuData.table.data);

document.querySelector(".open-menu").onclick = () => {
menuWrapper.classList.add("offcanvas");
};

document.querySelector(".close-menu").onclick = () => {
menuWrapper.classList.remove("offcanvas");
};

document.addEventListener("click", e => {
const collapsibles = document.querySelectorAll(".has-collapsible");
collapsibles.forEach(item => {
if (item.contains(e.target) && e.target.tagName === "A") {
e.preventDefault();
item.classList.toggle("active");
collapsibles.forEach(i => { if (i !== item) i.classList.remove("active"); });
}
});
});

document.getElementById("menuSearch").addEventListener("input", function () {
const term = this.value.toLowerCase();
const items = sidebarMenu.querySelectorAll("[data-name]");

items.forEach(item => {
const name = item.getAttribute("data-name");
const isMatch = name.includes(term);
item.style.display = isMatch ? "" : "none";

if (item.classList.contains("has-collapsible")) {
const subItems = item.querySelectorAll(".menu-child-item");
let anyVisible = false;
subItems.forEach(sub => {
const subMatch = sub.getAttribute("data-name").includes(term);
sub.style.display = subMatch ? "" : "none";
if (subMatch) anyVisible = true;
});
item.style.display = anyVisible || isMatch ? "" : "none";
if (anyVisible) item.classList.add("active");
else item.classList.remove("active");
}
});
});

// Toggle Profile Dropdown
const profileToggle = document.getElementById("profileToggle");
const profileDropdown = document.getElementById("profileDropdown");

profileToggle.addEventListener("click", () => {
profileDropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
profileDropdown.classList.remove("active");
}
});


let menuList = [];
for (let i = 1; i <= 20; i++) {
menuList.push({ id: i, nama: `Menu ${i}`, icon: `icon${i}`, url: `#${i}` });
}

let currentPage = 1;
let perPage = 10;

function renderTable() {
const tbody = document.getElementById("tableBody");
const search = document.getElementById("search").value.toLowerCase();
let filtered = menuList.filter(item => item.nama.toLowerCase().includes(search));

const start = perPage === 'all' ? 0 : (currentPage - 1) * perPage;
const end = perPage === 'all' ? filtered.length : start + perPage;
const visibleItems = filtered.slice(start, end);

tbody.innerHTML = "";
visibleItems.forEach(item => {
const row = document.createElement("tr");
row.innerHTML = `
<td><input type="checkbox" value="${item.id}"></td>
<td>${item.id}</td>
<td>${item.nama}</td>
<td>${item.icon}</td>
<td>${item.url}</td>
<td>
<button onclick="editItem(${item.id})">Edit</button>





<div class="menu-dropdown">
<button class="menu-button">⋮</button>
<div class="menu-dropdown-content">
<a href="link1.html?id=${item.id}" target="_blank">Link 1</a>
<a href="link2.html?id=${item.id}" target="_blank">Link 2</a>
</div>
</div>
</td>
`;
tbody.appendChild(row);
});

const totalPages = perPage === 'all' ? 1 : Math.ceil(filtered.length / perPage);
document.getElementById("pageInfo").textContent = `Halaman ${currentPage} dari ${totalPages}`;
}

function toggleAll(source) {
document.querySelectorAll("#tableBody input[type='checkbox']").forEach(cb => cb.checked = source.checked);
}

function addItem() {
document.getElementById("modalTitle").textContent = "Tambah Menu";
document.getElementById("formId").value = "";
document.getElementById("formNama").value = "";
document.getElementById("formIcon").value = "";
document.getElementById("formUrl").value = "";
document.getElementById("modal").style.display = "flex";
}

function editItem(id) {
const item = menuList.find(m => m.id === id);
document.getElementById("modalTitle").textContent = "Edit Menu";
document.getElementById("formId").value = item.id;
document.getElementById("formNama").value = item.nama;
document.getElementById("formIcon").value = item.icon;
document.getElementById("formUrl").value = item.url;
document.getElementById("modal").style.display = "flex";
}

function editSelected() {
const selected = Array.from(document.querySelectorAll("#tableBody input[type='checkbox']:checked"));
if (selected.length === 1) {
const id = parseInt(selected[0].value);
editItem(id);
} else {
alert("Pilih tepat satu item untuk diedit.");
}
}

function saveItem() {
const id = document.getElementById("formId").value;
const nama = document.getElementById("formNama").value;
const icon = document.getElementById("formIcon").value;
const url = document.getElementById("formUrl").value;

if (id) {
const index = menuList.findIndex(i => i.id == id);
if (index !== -1) {
menuList[index] = { id: parseInt(id), nama, icon, url };
}
} else {
const newId = menuList.length ? Math.max(...menuList.map(i => i.id)) + 1 : 1;
menuList.push({ id: newId, nama, icon, url });
}
closeModal();
renderTable();
}

function closeModal() {
document.getElementById("modal").style.display = "none";
}

function prevPage() {
if (currentPage > 1) {
currentPage--;
renderTable();
}
}

function nextPage() {
const search = document.getElementById("search").value.toLowerCase();
const filtered = menuList.filter(item => item.nama.toLowerCase().includes(search));
const totalPages = perPage === 'all' ? 1 : Math.ceil(filtered.length / perPage);
if (currentPage < totalPages) {
currentPage++;
renderTable();
}
}

function changePerPage() {
const selected = document.getElementById("perPage").value;
perPage = selected === 'all' ? 'all' : parseInt(selected);
currentPage = 1;
renderTable();
}

function deleteSelected() {
const checkboxes = document.querySelectorAll("#tableBody input[type='checkbox']:checked");
if (checkboxes.length === 0) {
alert("Pilih minimal satu item untuk dihapus.");
return;
}

if (confirm("Apakah Anda yakin ingin menghapus item yang dipilih?")) {
const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.value));
menuList = menuList.filter(item => !idsToDelete.includes(item.id));
renderTable();
}
}

function switchTab(tabId) {
document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add('active');
document.getElementById(tabId).classList.add('active');
}

document.getElementById("search").addEventListener("input", () => {
currentPage = 1;
renderTable();
});


document.addEventListener("click", function(e) {
// Cek apakah klik pada tombol menu-dropdown
if (e.target.closest(".menu-button")) {
const btn = e.target.closest(".menu-button");
const dropdownContent = btn.nextElementSibling;
const allDropdowns = document.querySelectorAll(".menu-dropdown-content");

// Tutup semua dropdown lain
allDropdowns.forEach(d => {
if (d !== dropdownContent) d.classList.remove("active");
});

// Toggle dropdown terkait
dropdownContent.classList.toggle("active");
} else {
// Klik di luar, tutup semua dropdown
document.querySelectorAll(".menu-dropdown-content").forEach(d => d.classList.remove("active"));
}
});


window.onload = renderTable;
