const fetchAddress = async (ip) => {
	try {
		const API_KEY = "at_S1gU7ZVRJc2M7WK473fv3iNht7st5";
		const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip}`);
		const data = response.json();
		return data;
	} catch (err) {
		const error = document.querySelectorAll(".error");
		const container = document.querySelector(".container");
		const map = document.querySelector("#mapid");
		error[1].classList.remove("hidden");
		container.classList.add("hidden");
		map.classList.add("hidden");
		console.log(err);
	}
};

const mymap = L.map("mapid").setView([22.29161, 70.79322], 13);
const addMap = (coordinates) => {
	L.tileLayer(
		"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
		{
			maxZoom: 18,
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
				'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: "mapbox/streets-v11",
			tileSize: 512,
			zoomOffset: -1,
		}
	).addTo(mymap);
	L.marker(coordinates).addTo(mymap);
};

const addData = async () => {
	const search = document.querySelector(".search");
	const showData = document.querySelectorAll(".heading");
	let checkIP = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

	if (search.value == "" || search.value == null || !checkIP.test(search.value)) {
		alert("Enter valid IP address");
		return;
	}
	data = await fetchAddress(search.value);
	showData[0].innerHTML = data.ip;
	showData[1].innerHTML = `${data.location.region}, ${data.location.city}${
		data.location.postalCode ? `, ${data.location.postalCode}` : ``
	}`;
	showData[2].innerHTML = `UTC${data.location.timezone}`;
	showData[3].innerHTML = data.isp;
	mymap.panTo([data.location.lat, data.location.lng]);
	L.marker([data.location.lat, data.location.lng]).addTo(mymap);
};

const app = () => {
	addMap([22.29161, 70.79322]);
	const form = document.querySelector(".form");
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		await addData();
	});
};
window.onload = app();
