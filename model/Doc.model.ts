
export class Doc  {
  doc_id: number;
  content: string;
  title: string;
  course_id: number;
  video_fk: number;

  constructor(
    doc_id: number,
    content: string,
    title: string,
    course_id: number,
    video_fk: number
  ) {
    this.doc_id = doc_id;
    this.content = content;
    this.title = title;
    this.course_id = course_id;
    this.video_fk = video_fk;
  }
}
