export function makeMovieList(data) {
    console.log(data);
    const cardList = document.getElementById("cardList"); // 영화 목록을 담을 컨테이너
    cardList.innerHTML = ""; // 이전 내용을 초기화

    data.forEach(movie => {
        const cardElement = document.createElement("li");
        cardElement.classList.add("card");
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        cardElement.innerHTML = `
            <a href="#">
                <img src="${imageUrl}" alt="${movie.title}" class="movie-poster">
                <div class="card-content">
                    <h2 class="movie-title">${movie.title}</h2>
                    <p class="vote_average">평점: ${movie.vote_average.toFixed(1)}</p>
                </div>
            </a>
        `;

        // 카드 리스트 클릭 시 모달창 열기
        cardElement.addEventListener("click", function () {
            const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            // 모달 내용 업데이트
            document.getElementById("modalImage").src = imageUrl;
            document.getElementById("modalTitle").textContent = movie.title;
            document.getElementById("modalOverView").textContent = movie.overview;
            document.getElementById("modalReleaseDate").textContent = `개봉일: ${movie.release_date}`;
            document.getElementById("modalRating").textContent = `평점: ${movie.vote_average.toFixed(1)}`;

            const modalContainer = document.querySelector(".modalContainer");
            // 모달창 hide 속성을 삭제 => 모달창 나타남
            modalContainer.classList.remove("hide");
            // 모달창 show 클래스 추가 => display: flex 로 바뀜
            document.getElementById("movieModal").classList.add("show");
        });

        // 카드리스트 ul 태그의 하위 태그로 li 가 생김 => 카드 리스트 추가됨
        cardList.appendChild(cardElement);
    });
}

export function modalClose() {
    const modalCloseButton = document.querySelector(".modalCloseButton");
    const modalContainer = document.querySelector(".modalContainer");

    modalCloseButton.addEventListener("click", function () {
        // 다시 hide 속성 추가!
        modalContainer.classList.add("hide");
        // class show 삭제 => 모달창 사라짐
        document.getElementById("movieModal").classList.remove("show");
    });
}

export function backButton() {
    const backBtn = document.querySelector(".back-btn");

    backBtn.addEventListener("click", function () {
        window.location.href = "index.html"; // 홈으로 이동
    });
}

export function showErrorMessage() {
    const errorMsg = document.createElement("div");
    errorMsg.classList.add("errorMsg");
    errorMsg.textContent = "에러가 발생했습니다! 나중에 다시 시도해주세요.";
    document.body.appendChild(errorMsg);

    setTimeout(() => {
        errorMsg.remove();
    }, 3000);
}

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGVkNzhlZDlhZjgwMjE1ZGM1YTFiNTgxODI3ODhmNCIsIm5iZiI6MTcyOTA1NDU4Ny4yMzUwMDksInN1YiI6IjY3MGYzM2Y5MzNlMTQ3OGY3NjZkYjY5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VkQg9PUKgzn_PLr7-wJqW1fZ48NJUyd5grnOf7dpw1w' // 여기에 API 키 추가
    }
};

function getMovieApi() {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1', options)
        .then(response => response.json())
        .then(response => {
            makeMovieList(response.results);
        })
        .catch(() => {
            showErrorMessage();
        });
}

// DOMContentLoaded : HTML 문서가 완전히 파싱된 후에 JavaScript 코드를 실행 => 오류 방지
document.addEventListener("DOMContentLoaded", () => {
    getMovieApi();
    modalClose();
    backButton();
});

