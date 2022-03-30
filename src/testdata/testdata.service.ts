import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TestLanguageDto,
  TestLanguageInputDto,
  TestRecruitDto,
  TestRecruitInputDto,
  TestStackDto,
  TestStackInputDto,
  TestStackToLanguageDto,
  TestStackToLanguageInputDto,
  TestTaskDto,
  TestTaskInputDto,
} from 'src/dto/testdata.dto';
import { Language } from 'src/entities/language.entity';
import { Recruit } from 'src/entities/recruit.entity';
import { Task } from 'src/entities/task.entity';
import { Techstack } from 'src/entities/techstack.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestdataService {
  constructor(
    @InjectRepository(Recruit)
    private readonly recruitsRepository: Repository<Recruit>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Techstack)
    private readonly techstacksRepository: Repository<Techstack>,
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
  ) {}

  async putRecruitData(testData: TestRecruitInputDto[]): Promise<Boolean> {
    const recruitInfo: TestRecruitDto[] = [];
    for (const targetData of testData) {
      const taskData: { taskCode: string }[] = targetData.task.map(
        (targetTask) => ({
          taskCode: targetTask,
        }),
      );
      const stackData: { stackCode: string }[] = targetData.stack.map(
        (targetStack) => ({
          stackCode: targetStack,
        }),
      );
      const dueDate = Date.parse(targetData.dueDate)
        ? new Date(targetData.dueDate)
        : null;
      recruitInfo.push({
        ...targetData,
        tasks: taskData,
        techstacks: stackData,
        dueDate,
        dueType: dueDate ? 1 : 0,
      });
    }
    await this.recruitsRepository.save(recruitInfo);
    return true;
  }

  async putTaskData(testData: TestTaskInputDto[]): Promise<Boolean> {
    const taskInfo: TestTaskDto[] = [];
    for (const targetData of testData) {
      const { task: taskName } = targetData;
      taskInfo.push({
        taskName,
        taskCode: targetData['code1'],
        isDuplicate: false,
      });
      if (targetData['code2'] !== '') {
        taskInfo.push({
          taskName,
          taskCode: targetData['code2'],
          isDuplicate: true,
        });
      }
      if (targetData['code3'] !== '') {
        taskInfo.push({
          taskName,
          taskCode: targetData['code3'],
          isDuplicate: true,
        });
      }
    }
    await this.tasksRepository.save(taskInfo);
    return true;
  }

  async putStackData(testData: TestStackInputDto[]): Promise<Boolean> {
    const stackInfo: TestStackDto[] = [];

    for (const { stack, code1 } of testData) {
      stackInfo.push({
        stackName: stack,
        stackCode: code1,
      });
    }
    await this.techstacksRepository.save(stackInfo);
    return true;
  }

  async putLanguageData(testData: TestLanguageInputDto[]): Promise<Boolean> {
    const languageInfo: TestLanguageDto[] = [];
    for (const { language: languageName, id: languageCode } of testData) {
      languageInfo.push({
        languageName,
        languageCode,
      });
    }
    await this.languagesRepository.save(languageInfo);
    return true;
  }

  async putStackToLanguageData(
    testData: TestStackToLanguageInputDto[],
  ): Promise<Boolean> {
    for (const {
      stack: stackName,
      language_id1,
      language_id2,
      language_id3,
      language_id4,
      language_id5,
    } of testData) {
      const languageInfo: Language[] = [];
      if (language_id1 !== '') {
        const targetLanguageData = await this.languagesRepository.findOne({
          id: language_id1,
        });
        if (targetLanguageData) languageInfo.push(targetLanguageData);
      }
      if (language_id2 !== '') {
        const targetLanguageData = await this.languagesRepository.findOne({
          id: language_id2,
        });
        if (targetLanguageData) languageInfo.push(targetLanguageData);
      }
      if (language_id3 !== '') {
        const targetLanguageData = await this.languagesRepository.findOne({
          id: language_id3,
        });
        if (targetLanguageData) languageInfo.push(targetLanguageData);
      }
      if (language_id4 !== '') {
        const targetLanguageData = await this.languagesRepository.findOne({
          id: language_id4,
        });
        if (targetLanguageData) languageInfo.push(targetLanguageData);
      }
      if (language_id5 !== '') {
        const targetLanguageData = await this.languagesRepository.findOne({
          id: language_id5,
        });
        if (targetLanguageData) languageInfo.push(targetLanguageData);
      }

      const stackInfo = await this.techstacksRepository.find({
        where: { stackName },
        select: ['id'],
      });
      for (const targetStack of stackInfo) {
        var languages: Language[] = [...languageInfo];
        if (targetStack.languages)
          languages = [...languages, ...targetStack.languages];
        await this.techstacksRepository.save([
          {
            ...targetStack,
            languages,
          },
        ]);
      }
    }
    return true;
  }
}
