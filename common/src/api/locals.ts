import { LocalsSchema } from "./../schemas/locals-schema";
export async function getLocals() {
  const url = "http://localhost:3000/api/locals";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  await new Promise((res) => setTimeout(() => res(""), 1500));

  const response = await fetch(url, options);
  const locals = await response.json();
  return LocalsSchema.parse(locals);
}
