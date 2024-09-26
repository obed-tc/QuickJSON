import SwitchComponent from "../common/SwitchComponent";

function Header() {
  return (
    <header className=" w-full flex justify-between dark:text-white px-5 py-3">
      <h1>QuickJSON</h1>
      <SwitchComponent />
    </header>
  );
}

export default Header;
