import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { handleForm } from "../redux/features/authSlice";

const SignIn = () => {
const {form} = useSelector((store: RootState) => store.auth);
const dispatch = useDispatch<AppDispatch>();

const handleFormChange = (e: any) => {
  dispatch(handleForm({
    name: e.target.name,
    value: e.target.value
  }))
}

  return (
    <main>
      <h1 className="mt-12 text-center">
        {' '}
        Sign in to your <strong>PayWay</strong> account{' '}
      </h1>
      <section className="flex flex-col gap-3.5 py-6 rounded-t-3xl px-5 md:px-10">
        


        <input
          type="email"
          required={true}
          className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleFormChange}
        />

        <input
          type="password"
          className="border border-black rounded-lg py-2 px-4 outline-none focus:border-2 focus:border-gray-700"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleFormChange}
        />

        <button
          id="signup"
          className="bg-black text-white font-semibold py-2 px-6 rounded-lg cursor-pointer mt-8"
        >
          <p>Log in</p>
        </button>
      </section>
    </main>
  );
};

export default SignIn;
