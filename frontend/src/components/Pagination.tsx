export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

    return (
        <div className="flex justify-center">
            <ul className="flex border border-slate-300">
                {pageNumbers.map((number) => (
                    <li
                        className={`px-2 py-1 ${
                            page === number ? 'bg-gray-200' : ''
                        }`}
                    >
                        <button onClick={() => onPageChange(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
