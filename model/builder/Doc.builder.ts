import { Doc } from "../Doc.model";
export class DocBuilder  {
    doc_id: number
    content: string;
    title: string;
    course_id: number;
    video_fk: number;



    setDocId(doc_id: number): DocBuilder {
        this.doc_id = doc_id;
        return this;
    }
    setContent(content: string): DocBuilder {
        this.content = content;
        return this;
    }
    setTitle(title: string): DocBuilder {
        this.title = title;
        return this;
    }
    setCourseId(course_id: number): DocBuilder {
        this.course_id = course_id;
        return this;
    }
    setVideoFk(video_fk: number): DocBuilder {
        this.video_fk = video_fk;
        return this;
    }
    build(): Doc {
        return new Doc(
            this.doc_id,
            this.content,
            this.title,
            this.course_id,
            this.video_fk
        );
    }}