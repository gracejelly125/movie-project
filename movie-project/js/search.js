import { modalClose } from "./script.js";
import { makeMovieList } from "./script.js";
import { options } from "./script.js";
import { backButton } from "./script.js";
import { showErrorMessage } from "./script.js";

const search = document.querySelector(".search-text");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", function (event) {
    event.preventDefault(); // 기본 폼 제출 방지
    if (search.value.trim() === "") {  // 입력이 비어 있는지 확인
        alert("영화 제목을 입력해주세요.");
    } else {
        searchMovie(search.value.trim()); // 사용자의 입력으로 searchMovie 호출
    }
});

function searchMovie(query) {
    fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko&page=1&query=${encodeURIComponent(query)}`, options)
        .then(response => response.json())
        .then(response => {
            if (response.results.length === 0) {
                alert("찾는 영화가 없습니다."); // 영화가 없을 때 메시지 표시
            } else {
                makeMovieList(response.results); // 영화 목록 생성
            }
        })
        .catch(() => {
            showErrorMessage(); 
        });
}

modalClose();
backButton();




