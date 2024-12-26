import { useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/router";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/router";
import { useState } from "react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const title = body.get("title");
  console.log(title);
  return {
    title: "success",
  };
};

export const loader = async () => {
  return await fetch("https://reqres.in/api/users?page=2").then((res) =>
    res.json()
  );
};

export default function Test() {
  const data = useLoaderData<typeof loader>();
  const initData = {
    name: "xeefour@gmail.com",
    job: "xxxx",
  };
  const [d, setD] = useState(initData);

  const test = async (data: { name: string; job: string }) => {
    console.log(data);
    const user = await fetch("https://reqres.in/api/users", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(user);
  };
  return (
    <>
      {data.data.map((user: any) => (
        <div key={user.id}>
          <div>{user.email}</div>
        </div>
      ))}
      <label>
        Title
        <input
          type="text"
          name="name"
          value={d.name}
          onChange={(e) => setD({ ...d, name: e.target.value })}
        />
        <input
          type="text"
          name="job"
          value={d.job}
          onChange={(e) => setD({ ...d, job: e.target.value })}
        />
      </label>
      <div>{JSON.stringify(d)}</div>
      <button type="submit" onClick={() => test(d)}>
        Submit
      </button>
    </>
  );
}
