// HTML 요소 가져오기
const dialogueText = document.getElementById('dialogue-text');
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 빤쮸토끼의 대화 문구
const dialogueMsgs = {
  welcome: "어, 어서와! 프린세스... 가 아니라, 체크리스트 마스터가 되어보자! <br> 오늘 할 일들을 여기에 적어볼래? (둑흔)",
  added: "할 일이 추가되었네! (빤쮸를 고쳐입으며) 열심히 해보자구!",
  completed: "오! 해냈구나! 대단해! (감격) ",
  deleted: "할 일을 삭제했어? (흠칫) 뭐... 어쩔 수 없지... ",
  allDone: "우와! 모든 할 일을 완료했어! <br> 오늘 정말 고생했어! 최고의 마스터야! (박수)"
};

// 페이지 로드 시 초기 대화 설정
dialogueText.innerHTML = dialogueMsgs.welcome;

// '추가' 버튼 클릭 시 실행되는 함수
function addTodo() {
  const todoContent = todoInput.value.trim(); // 입력된 값 가져오기 (양쪽 공백 제거)

  if (todoContent !== "") { // 내용이 입력되었을 때만 추가
    // 새 목록 항목 (li) 생성
    const li = document.createElement('li');
    li.innerHTML = `<span>${todoContent}</span>`;
    
    // 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '삭제';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    // 목록에 항목 추가
    todoList.appendChild(li);

    // 입력창 초기화
    todoInput.value = "";

    // 빤쮸토끼 대화 변경
    dialogueText.innerText = dialogueMsgs.added;

    // 할 일 항목 클릭 이벤트 추가 (완료 표시)
    li.addEventListener('click', toggleComplete);

    // 삭제 버튼 클릭 이벤트 추가
    deleteBtn.addEventListener('click', deleteTodo);
  } else {
    alert("할 일을 입력해줘!");
  }
}

// '추가' 버튼에 이벤트 리스너 등록
addBtn.addEventListener('click', addTodo);

// 할 일 입력창에서 엔터키를 눌렀을 때도 추가되도록 설정
todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// 할 일 완료 표시/해제 함수
function toggleComplete(e) {
  const li = e.currentTarget;
  li.classList.toggle('checked'); // 'checked' 클래스 추가/제거

  if (li.classList.contains('checked')) {
    dialogueText.innerText = dialogueMsgs.completed;
  } else {
    dialogueText.innerText = dialogueMsgs.added; // 완료 해제 시 다시 'added' 문구로
  }
}

// 할 일 삭제 함수
function deleteTodo(e) {
  e.stopPropagation(); // li 클릭 이벤트가 실행되지 않도록 방지
  const li = e.target.parentElement;
  li.remove(); // 항목 제거
  dialogueText.innerText = dialogueMsgs.deleted;
}