import { useEffect, useState } from "react";
import { IEssenceMwCard } from "../../types";
import { parseURL } from "../../helpers/functions";

const EssenceMwCard = ({
    essenceID,
    tokenURI,
    setSelectedEssenceId,
    setSelectedEssenceContent,
    setShowDropdown
}: IEssenceMwCard) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!tokenURI) return;
        (async () => {
            setContent("");
            try {
                const res = await fetch(parseURL(tokenURI));
                if (res.status === 200) {
                    const data = await res.json();
                    setContent(data?.content);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [tokenURI]);

    const handleOnClick = () => {
        setSelectedEssenceId(essenceID);
        setSelectedEssenceContent(content);
        setShowDropdown(false);
    }

    return (
        <div
            className="essence-mw-card"
            onClick={handleOnClick}
        ><div>{content}</div></div>
    );
};

export default EssenceMwCard;