import { useState, useEffect } from "react";

const useTypingEffect = (texts = [], baseSpeed = 80, pause = 1000) => {
    const [displayedText, setDisplayedText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFinalTyping, setIsFinalTyping] = useState(false);

    useEffect(() => {
        if (texts.length === 0) return;

        const currentText = texts[textIndex];
        const isLastText = textIndex === texts.length - 1;
        const typingSpeed = baseSpeed + Math.random() * 40;
        const deleteSpeed = typingSpeed / 2;

        const timeout = setTimeout(() => {

            if (isFinalTyping) {
                if (charIndex < texts[0].length) {
                    setDisplayedText(texts[0].slice(0, charIndex + 1));
                    setCharIndex(prev => prev + 1);
                }
                return;
            }

            if (!isDeleting) {
                // Typing phase
                setDisplayedText(currentText.slice(0, charIndex + 1));
                setCharIndex(prev => prev + 1);

                if (charIndex + 1 === currentText.length) {
                    setTimeout(() => setIsDeleting(true), pause);
                }
            } else {
                // Deleting phase
                setDisplayedText(currentText.slice(0, charIndex - 1));
                setCharIndex(prev => prev - 1);

                if (charIndex - 1 === 0) {
                    setIsDeleting(false);

                    if (!isLastText) {
                        setTextIndex(prev => prev + 1);
                    } else {

                        setIsFinalTyping(true);
                        setTextIndex(0);
                        setCharIndex(0);
                    }
                }
            }
        }, isDeleting ? deleteSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, texts, baseSpeed, pause, isFinalTyping]);

    return displayedText;
};

export default useTypingEffect;
