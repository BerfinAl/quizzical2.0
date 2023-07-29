export async function getQuestion() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple"
  );
  const data = await res.json();
  return data.results[0];
}