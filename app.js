const { createApp, ref, onMounted } = Vue;

const app = createApp({
    setup() {
        const question = ref('');
        const questionField = ref('');
        const answerField = ref('');
        const answer = ref('');
        const completionText = ref([]);
        const parsingEmptyContentArray = ref([]);
        const placeholderUnderline = ref([]);
        const tags = ref([]);
        const tagsField = ref('');
        const countdown = ref('');
        const deckNameField = ref('');
        const templateType = ref('')
        const templateField = ref('')
        const parsingField = ref('')
        const parsing = ref('')
        const isBack = ref('')
        const fillInBlankContent = ref([])

        // 设置模板类型
        const setTemplateType = () => {
            templateType.value = templateField.value.innerHTML || '1';
        }

        // 提取公共逻辑
        const getQuestionHtml = () => questionField.value.innerHTML;

        // 获取问题内容
        const getQuestionContent = () => {
            const html = getQuestionHtml();
            const parts = html.split(/(【.+?】)/);
            let fillInBlankCounter = 1;
            for (let i = 0; i < parts.length; i++) {
                if (/^【.+?】$/.test(parts[i])) {
                    parts.splice(i, 1, `填空${fillInBlankCounter}`);
                    fillInBlankCounter++;
                }
            }
            completionText.value = parts;
        };

        // 解析填空
        const getParseFillInBlankContent = () => {
            const regex = /【(.*?)】/g;
            let match;
            while ((match = regex.exec(questionField.value.innerHTML)) !== null) {
                parsingEmptyContentArray.value.push(match[1]);
            }

            const emptyCount = parsingEmptyContentArray.value.length;
            placeholderUnderline.value = Array(emptyCount).fill(" [···] ");
        }

        const clickToDisplay = (string) => {
            let latexPattern = /(?:\\[a-zA-Z]+\{.*?\}|\$.*?\$|\\\(|\\\)|\\\[[^\]]*?\\\])/g;
            const num = string.substring(2) - 1

            if (placeholderUnderline.value[num] === parsingEmptyContentArray.value[num]) {
                placeholderUnderline.value[num] = " [···]"
            } else {
                if (parsingEmptyContentArray.value[num].match(latexPattern) && parsingEmptyContentArray.value[num].match(latexPattern).length > 0) {
                    setTimeout(console.log('123 :>> ', 123), 0);
                    // 调用anki的内置js函数
                    // setTimeout(MathJax.typesetPromise, 0);
                }
                placeholderUnderline.value[num] = parsingEmptyContentArray.value[num]
            }
        }

        const setFillInBlank = () => {
            completionText.value = questionField.value.innerHTML.split(/(【.+?】)/);

            let fillInBlankCounterNum = 1;
            for (let i = 0; i < completionText.value.length; i++) {
                if (/^【.+?】$/.test(completionText.value[i])) {
                    fillInBlankContent.value.push(completionText.value[i].substring(1, completionText.value[i].length - 1))
                    completionText.value.splice(i, 1, `填空${fillInBlankCounterNum}`);
                    fillInBlankCounterNum++;
                }
            }
        }

        // 设置标签
        const setTags = () => {
            tags.value = tagsField.value.innerText.split('-');
        };

        // 计算倒计时
        const calculateCountdown = () => {
            const dateString = deckNameField.value.innerHTML.split('::')[0];
            const targetDate = dayjs(dateString, 'YYYY/MM/DD');
            const today = dayjs();
            const remainingDays = targetDate.diff(today, 'day');
            countdown.value = `${remainingDays}天`;
        };

        onMounted(() => {
            setTemplateType()
            if (templateType.value == 1) {
                question.value = getQuestionHtml();
            }
            answer.value = answerField.value.innerHTML
            parsing.value = parsingField.value.innerHTML


            if (templateType.value == 2 && isBack.value.innerHTML != 1) {
                getQuestionContent();
                getParseFillInBlankContent();
            } else {
                setFillInBlank()
            }

            calculateCountdown();
            setTags();

        });

        return {
            question,
            questionField,
            completionText,
            placeholderUnderline,
            parsingEmptyContentArray,
            clickToDisplay,
            tags,
            tagsField,
            countdown,
            deckNameField,
            templateType,
            templateField,
            setTemplateType,
            getQuestionContent,
            getParseFillInBlankContent,
            parsing,
            parsingField,
            answer,
            answerField,
            isBack,
            fillInBlankContent,
            setFillInBlank,
        };
    }
});

app.use(TDesign).mount('#app');