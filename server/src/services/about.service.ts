import { IAbout, IAboutService } from "../interfaces/about.interface";
import About from "../models/about.model";

class AboutService implements IAboutService {
  async getAbout(): Promise<IAbout | null> {
    const aboutData = await About.findOne();
    return aboutData;
  }

  async updateAbout(contentData: Partial<IAbout>): Promise<IAbout> {
    let about = await About.findOne();

    if (!about) {
      about = await About.create(contentData);
    } else {
      about.content = contentData.content ?? about.content;
      await about.save();
    }
    return about;
  }
}

export default new AboutService();
