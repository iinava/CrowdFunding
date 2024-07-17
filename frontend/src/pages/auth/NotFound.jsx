function NotFound() {
  return (
    <div className="flex justify-center items-center gap-20 flex-wrap-reverse p-3 h-screen">
      <img
        src="https://ik.imagekit.io/nh40wkvsj/business-3d-astronaut-and-dog-in-space-suit-floating.png?updatedAt=1720897600958"
        alt=""
      />
      <div className="">
        <h1 className="text-[150px]  font-thin shadow ">404</h1>
        <p className="font-thin text-3xl">oops ! You lost you way </p>
        <a href="/">Go home</a>
      </div>
    </div>
  );
}

export default NotFound;
