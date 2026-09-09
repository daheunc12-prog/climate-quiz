let map = L.map('map').setView([20, 0], 2);

// 지도 타일 레이어 추가
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let currentQuiz = null;
let currentMarker = null;

function loadNextQuiz() {
  if (currentMarker) map.removeLayer(currentMarker);

  // 랜덤 도시 선택
  currentQuiz = climateData[Math.floor(Math.random() * climateData.length)];

  // 점 표시 (붉은색 서클 마커)
  currentMarker = L.circleMarker([currentQuiz.lat, currentQuiz.lng], {
    color: '#ff0000',
    fillColor: '#ff0000',
    fillOpacity: 0.8,
    radius: 9
  }).addTo(map);

  // 해당 위치로 지도 시점 이동
  map.setView([currentQuiz.lat, currentQuiz.lng], 4);

  // 화면 업데이트
  document.getElementById('city-name').innerText = currentQuiz.city;
  document.getElementById('result-msg').innerText = '';
  document.getElementById('answer-input').value = '';
  document.getElementById('answer-input').focus();
}

function handleFormSubmit(event) {
  event.preventDefault(); // 폼 제출 시 페이지 뒤로 넘어감 방지

  const userAnswer = document.getElementById('answer-input').value.trim();
  const resultMsg = document.getElementById('result-msg');

  if (!userAnswer) return;

  // 대소문자 구분 없이 정답 체크
  if (userAnswer.toLowerCase() === currentQuiz.climate.toLowerCase()) {
    resultMsg.style.color = 'green';
    resultMsg.innerText = `⭕ 정답입니다! (${currentQuiz.city} = ${currentQuiz.climate})`;
    setTimeout(loadNextQuiz, 1200);
  } else {
    resultMsg.style.color = 'red';
    resultMsg.innerText = `❌ 오답입니다. 정답은 [ ${currentQuiz.climate} ] 입니다.`;
  }
}

// 최초 시작
loadNextQuiz();
