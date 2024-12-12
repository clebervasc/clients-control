export const NotFoundPage = () => (
  <section>
    <div className="text-white">
      <div className="flex mt-40">
        <div className="m-auto text-center">
          <div>
            <img src="/notfound.svg" alt="not found" className="object-cover" />
          </div>
          <p className="text-sm md:text-base dark:text-yellow-300 text-yellow-950 p-2 mb-4">
            A página acessada não existe!
          </p>
          <a
            href="/"
            className="bg-transparent dark:hover:bg-yellow-300 hover:bg-yellow-950 dark:text-yellow-300 text-yellow-950 dark:hover:text-yellow-950 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border dark:border-yellow-300 border-yellow-950 hover:border-transparent"
          >
            Voltar
          </a>
        </div>
      </div>
    </div>
  </section>
)
