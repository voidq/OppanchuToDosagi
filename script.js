// 요소 가져오기
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const dialogueText = document.getElementById('dialogue-text');
const popupOverlay = document.getElementById('complete-popup-overlay');
const closePopupBtn = document.getElementById('close-popup-btn');

// 대화 모음
const msgs = {
    added: "오... 할 일이 늘어났어. 파이팅! (울먹)",
    completed: "대단해! 하나 해냈구나!",
    deleted: "삭제했어? 아... 안 하는 거야...?",
    allDone: "우와아아! 다 끝냈어! 너 좀 멋진걸?"
};

// 추가 버튼 클릭 이벤트
addBtn.onclick = function() {
    const text = todoInput.value.trim();
    if (text === "") return alert("내용을 입력해줘!");

    const li = document.createElement('li');
    li.innerHTML = `<span>${text}</span><button class="delete-btn">삭제</button>`;
    
    // 리스트 클릭 (완료)
    li.onclick = function() {
        this.classList.toggle('checked');
        dialogueText.innerText = this.classList.contains('checked') ? msgs.completed : msgs.added;
        checkFinish();
    };

    // 삭제 버튼 클릭
    li.querySelector('.delete-btn').onclick = function(e) {
        e.stopPropagation();
        li.remove();
        dialogueText.innerText = msgs.deleted;
        checkFinish();
    };

    todoList.appendChild(li);
    todoInput.value = "";
    dialogueText.innerText = msgs.added;
};

// 엔터키 지원
todoInput.onkeypress = function(e) {
    if (e.key === 'Enter') addBtn.onclick();
};

// 전부 완료 체크
function checkFinish() {
    const all = todoList.querySelectorAll('li');
    const checked = todoList.querySelectorAll('li.checked');
    if (all.length > 0 && all.length === checked.length) {
        dialogueText.innerText = msgs.allDone;
        popupOverlay.classList.remove('hidden');
        setTimeout(() => popupOverlay.classList.add('show'), 10);
    }
}

// 팝업 닫기
closePopupBtn.onclick = function() {
    popupOverlay.classList.remove('show');
    setTimeout(() => popupOverlay.classList.add('hidden'), 300);
};
